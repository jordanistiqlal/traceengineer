<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('projects')->insert([
            [
                'project_id' => 'ad30fc4e-f3df-4949-9672-5761a2e1dd61',
                'project_name' => 'Project Alpha',
                'project_type' => 'INSTALASI',
                // 'user_id' => 'ENGKIE07',
                // 'task_id' => '05dab979-c311-4f4e-afe9-665a23e5b157',
                // 'ticket_id' => 'eda162c0-fe41-45f0-8768-80a5d5221086',
            ],
            [
                'project_id' => '10433c2a-b600-4efb-9171-3362a784092e',
                'project_name' => 'Project Beta',
                'project_type' => 'MAINTENANCE',
                // 'user_id' => 'ENGKDO44',
                // 'task_id' => 'a03a8694-9767-4884-aace-c1cb4960f0b3',
                // 'ticket_id' => '60bdaa91-0499-4065-99de-73bd1ffe77a5',
            ],
            [
                'project_id' => '38961e2e-a32c-4eee-9cb3-2dda2a1e1664',
                'project_name' => 'Project Gamma',
                'project_type' => 'INSTALASI',
                // 'user_id' => 'ENGKDI33',
                // 'task_id' => 'eb31ce2a-31c5-4e08-a6fc-c4bab43e6ceb',
                // 'ticket_id' => 'd70b634b-7385-4b03-9f7f-994759c26650',
            ],
        ]);
    }
}
