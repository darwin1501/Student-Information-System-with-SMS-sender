<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

use SMSGatewayMe\Client\ApiClient;
use Faker\Provider\bn_BD\PhoneNumber;
use SMSGatewayMe\Client\Configuration;
use SMSGatewayMe\Client\Api\MessageApi;
use SMSGatewayMe\Client\Model\SendMessageRequest;

class MessageController extends Controller
{
    public function sendGroupSms(Request $request)
    {
        // get sms config
        $smsConfig = Setting::where(['user_id' => auth()->user()->id])->get()->first();
    
        // Configure client
        $config = Configuration::getDefaultConfiguration();
        $config->setApiKey('Authorization', $smsConfig->api_key);
        $apiClient = new ApiClient($config);
        $messageClient = new MessageApi($apiClient);

        // loop each request and send sms
        foreach($request->all() as $student) { 
            $phoneNumber = $student['phoneNumber'];
            $message = $student['message'];

            // Sending a SMS Message
            $sendMessageRequest1 = new SendMessageRequest([
                'phoneNumber' => $phoneNumber,
                'message' => $message,
                'deviceId' => $smsConfig->device_id,
            ]);

            $sendMessages = $messageClient->sendMessages([
                $sendMessageRequest1
            ]);
        }
    }
}
