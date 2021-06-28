<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    public function getSmsConfig()
    {
        $smsConfig = Setting::where(['user_id' => auth()->user()->id])->get()->first();
        return $smsConfig;
    }

    public function saveSetting(Request $request)
    {
       $smsConfig = Setting::updateOrCreate(
                ['user_id' => $request->json('userId')],
                [
                    'user_id' => $request->json('userId'),
                    'api_key' => $request->json('smsApiKey'), 
                    'device_id' => $request->json('deviceId')
                ]
            );
        // $setting->api_key = $request->json('smsApiKey');
        // $setting->device_id = $request->json('deviceId');
        // $setting->save();
    }

    public function setSmsApiConfigStatus()
    {
        return count(Setting::where(['user_id' => auth()->user()->id])->get());
    }
}
