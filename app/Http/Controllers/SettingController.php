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

    public function saveSetting(Setting $setting,Request $request)
    {
        $setting->api_key = $request->json('smsApiKey');
        $setting->device_id = $request->json('deviceId');
        $setting->save();
    }
}
