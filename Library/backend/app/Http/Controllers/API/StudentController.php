<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index()
    {
        return response()->json(Student::where('deleted', 0)->get());
    }
    public function store(Request $request)
    {
        $request->validate([
            'student_id_number' => 'required|unique:students,student_id_number',
            'email' => 'required|email|unique:students,email',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'course' => 'required|string|max:255',
            'year_level' => 'required|string|max:255',
        ]);

        $student = Student::create($request->all());

        return response()->json($student, 201);
    }

    public function show($id)
    {
        $student = Student::findOrFail($id);
        return response()->json($student);
    }

    // Update student info or mark as deleted
    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        if ($request->has('deleted')) {
            $student->update(['deleted' => $request->deleted]);
            return response()->json(['message' => 'Student marked as deleted']);
        }

        $request->validate([
            'student_id_number' => 'required|string|max:255|unique:students,student_id_number,' . $id,
            'email' => 'required|email|max:255|unique:students,email,' . $id,
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'course' => 'required|string|max:255',
            'year_level' => 'required|string|max:255',
        ]);

        $student->update($request->all());

        return response()->json($student);
    }

    // List all soft-deleted students
    public function deletedStudents()
    {
        $deletedStudents = Student::where('deleted', 1)->get();
        return response()->json($deletedStudents);
    }
}
