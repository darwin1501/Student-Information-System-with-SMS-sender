<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    public function getSmsConfig()
    {
        $smsConfig = Setting::get()->first();
        return $smsConfig;
    }
}
