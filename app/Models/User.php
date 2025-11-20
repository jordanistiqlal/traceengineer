<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Ramsey\Uuid\Uuid;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $table = 'users';
    protected $primaryKey = 'user_id'; 
    public $incrementing = false;
    protected $keyType = 'string'; 

    protected $fillable = [
        'name',
        'email',
        'password',
        'nohp',
        'username',
        'useraccess',
        'role',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public static function boot()
    {
        parent::boot();

        static::created(function ($model) {
            if (!$model->user_id) {
                $uuid = str_replace("-", "", Uuid::uuid4()->toString());
                $shortUuid = substr($uuid, 0, 5);

                $prefix = $model->role === 'ENGINEER' ? 'ENG' : 'ADM';
                $model->user_id = $prefix . strtoupper($shortUuid);

                $model->saveQuietly();
            }
        });
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'user' => [
                'id' => $this->user_id,
                'username' => $this->username,
                'email' => $this->email,
                'role' => $this->role,
            ]
        ];
    }

    public function task(){
        return $this->hasMany(Task::class, 'user_id', 'user_id');
    }
}
