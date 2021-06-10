<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentsController extends Controller
{
    public function studentsPage()
    {
        // redirect and set value for the header
        return view('web.students.students')->with([
            'header' => 'Students'
        ]);
    }

    public function addStudent(Request $request)
    {
        $studentName = $request->json('studentName');
        $phoneNumber = $request->json('phoneNumber');

        $request->user()->students()->create([
            'students_name' => $studentName,
            'phone_number' => $phoneNumber,
            'created_by' => auth()->user()->username
        ]);

        return 'success';
    }
}
