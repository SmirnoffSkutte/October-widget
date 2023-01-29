<?php

namespace Admin\Debts\Components;

class DebtorsTable extends \Cms\Classes\ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => 'Таблица должников',
            'description' => 'Показывает долги квартирантов дома'
        ];
    }

    // This array becomes available on the page as {{ component.showDebtors }}
    public function showDebtors()
    {
        return ['First Post', 'Second Post', 'Third Post'];
    }

    public function onRun()
    {
        $this->addCss('/plugins/admin/debts/components/debtorstable/css/debtorsTable.css');
        $this->addCss('/plugins/admin/debts/components/debtorstable/css/debtorsTableToast.css');
//        $this->addJs('/plugins/admin/debts/components/debtorstable/table.js');
    }
}