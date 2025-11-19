<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tickets')->insert([
            [
                'ticket_id' => '60bdaa91-0499-4065-99de-73bd1ffe77a5',
                'ticket_site' => 'Surabaya',
                'ticket_problem' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                'ticket_tanggal' => '2020-01-01',
                'ticket_jam' => '00.00',
                'ticket_from' => 'ENGKIE07',
                'bodyraw' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            ],
            [
                'ticket_id' => 'eda162c0-fe41-45f0-8768-80a5d5221086',
                'ticket_site' => 'Malang',
                'ticket_problem' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                'ticket_tanggal' => '2024-06-01',
                'ticket_jam' => '00.00',
                'ticket_from' => 'ENGKDI33',
                'bodyraw' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            ],
            [
                'ticket_id' => 'd70b634b-7385-4b03-9f7f-994759c26650',
                'ticket_site' => 'Medang',
                'ticket_problem' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                'ticket_tanggal' => '2025-12-12',
                'ticket_jam' => '00.00',
                'ticket_from' => 'ENGKDO44',
                'bodyraw' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            ],
        ]);
    }
}
