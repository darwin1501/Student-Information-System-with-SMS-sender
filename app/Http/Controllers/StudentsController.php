<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentsController extends Controller
{
    public function getStudents()
    {
        // redirect and set value for the header
        return view('web.students.students')->with([
            'header' => 'Students'
        ]);
    }
}
