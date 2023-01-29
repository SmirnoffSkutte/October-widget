<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('debts')->insert([
            ['rec_id' => 1, 'build_id' => 1, 'username' => 'Иванов', 'quant_month'=>2, "quant_bal"=>10500],
            ['rec_id' => 2, 'build_id' => 1, 'username' => 'Петров', 'quant_month'=>1, "quant_bal"=>5000],
            ['rec_id' => 3, 'build_id' => 2, 'username' => 'Сидоров', 'quant_month'=>6, "quant_bal"=>4000],
            ['rec_id' => 4, 'build_id' => 2, 'username' => 'Хвостенко', 'quant_month'=>3, "quant_bal"=>16000],
            ['rec_id' => 5, 'build_id' => 2, 'username' => 'Алексеев', 'quant_month'=>12, "quant_bal"=>52600],
            ['rec_id' => 6, 'build_id' => 3, 'username' => 'Мерилов', 'quant_month'=>8, "quant_bal"=>31000],
        ]);

        DB::table('houses')->insert([
            ['id'=>1],
            ['id'=>2],
            ['id'=>3],
        ]);
    }
}
