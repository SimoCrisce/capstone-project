<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = Review::get();
        return $reviews;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $new_review = new Review();
        $new_review->user_id = Auth::id();
        $new_review->product_id = $data['product_id'];
        $new_review->content = $data['content'];
        $new_review->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $review = Review::find($id);
        return [
            'success' => true,
            'data' => $review
        ];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReviewRequest $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find(Auth::id());
        $review = Review::find($id);
        if ($user->id === $review->user_id) {
            $review->delete();
        }
    }
}
