<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    public function index()
{
    return response()->json(Book::where('deleted', 0)->get());
}

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'isbn' => 'required|string|max:255|unique:books',
            'copies' => 'required|integer|min:1',
        ]);

        $book = Book::create($request->all());

        return response()->json($book, 201);
    }

    public function show($id)
    {
        $book = Book::findOrFail($id);
        return response()->json($book);
    }

    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);

        if ($request->has('deleted')) {
            $book->update(['deleted' => $request->deleted]);
            return response()->json(['message' => 'Book marked as deleted']);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'isbn' => 'required|string|max:13|unique:books,isbn,' . $id,
            'copies' => 'required|integer|min:1',
        ]);

        $book->update($request->all());
        return response()->json($book);
    }

    public function deletedBooks()
{
    $deletedBooks = Book::where('deleted', 1)->get();

    return response()->json($deletedBooks);
}

}
