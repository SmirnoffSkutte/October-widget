<?php

namespace Admin\Debts;

class Plugin extends \System\Classes\PluginBase
{
    public function pluginDetails()
    {
        return [
            'name' => 'Плагин должников',
            'description' => 'Показывает информацию о должниках',
            'author' => 'admin',
            'icon' => 'icon-address-book'
        ];
    }

    public function registerComponents()
    {
        return [
            '\Admin\Debts\Components\DebtorsTable' => 'debtorsTable'
        ];
    }
}