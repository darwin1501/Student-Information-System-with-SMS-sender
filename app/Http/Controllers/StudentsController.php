<?php

namespace App\Http\Controllers;

use App\Models\Students;
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

    public function getStudents()
    {
        $students = Students::latest()->paginate(4);
        return $students;
    }

    public function searchStudent($studentsname)
    {
        $students = Students::query()
                    ->where([
                            ['students_name', 'LIKE', "%{$studentsname }%"]
                        ])
                    ->paginate(4);
        return $students;
    }

    public function editStudent(Students $student)
    {
        return $student;
    }

    public function updateStudent(Students $student, Request $request)
    {
        $student->students_name = $request->json('studentsName');
        $student->phone_number = $request->json('phoneNumber');
        $student->save();
    }

    public function deleteStudent(Students $student)
    {
        $student->delete();
    }
}
