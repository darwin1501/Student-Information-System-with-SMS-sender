<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use SMSGatewayMe\Client\ApiClient;
use SMSGatewayMe\Client\Configuration;
use SMSGatewayMe\Client\Api\MessageApi;
use SMSGatewayMe\Client\Model\SendMessageRequest;

class MessageController extends Controller
{
    public function sendSMS()
    {
        // Configure client
        $config = Configuration::getDefaultConfiguration();
        $config->setApiKey('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImlhdCI6MTYyMDI2NTc1NCwiZXhwIjo0MTAyNDQ0ODAwLCJ1aWQiOjg4NTEyLCJyb2xlcyI6WyJST0xFX1VTRVIiXX0.J7v4-5-lEjhYurjfEchF7UfO106SJAC0L2n8Inub8-U');
        $apiClient = new ApiClient($config);
        $messageClient = new MessageApi($apiClient);

        // Sending a SMS Message
        $sendMessageRequest1 = new SendMessageRequest([
            'phoneNumber' => '09319357410',
            'message' => 'Build Someting Amazing',
            'deviceId' => 124289
        ]);

        $sendMessages = $messageClient->sendMessages([
            $sendMessageRequest1
        ]);
    }
}
