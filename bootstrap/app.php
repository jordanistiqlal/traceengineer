<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        // api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
            'auth.api' => \Illuminate\Auth\Middleware\Authenticate::class,
            'auth:api' => \Illuminate\Auth\Middleware\Authenticate::class,
        ]);

        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (AuthenticationException $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated.',
                ], 401);
            }
        });
        
        // GLOBAL API ERROR HANDLER (untuk error lain: 404, 500, 403, dll)
        $exceptions->render(function (Throwable $e, $request) {

        if ($request->is('api/*') || $request->expectsJson()) {

            $status = 500;

            if ($e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
                $status = 404;
            }

            if ($e instanceof \Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException) {
                $status = 405;
            }

            if ($e instanceof \Illuminate\Auth\Access\AuthorizationException) {
                $status = 403;
            }

            if ($e instanceof \Illuminate\Validation\ValidationException) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage(),
                    'errors' => $e->errors(),
                ], 422);
            }

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'type' => class_basename($e),
            ], $status);
        }

        // Untuk web, Laravel gunakan default HTML error page
        return null;
    });
    })->create();
