<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($category = null)
    {
        if ($category) {
            $products = Product::where('category', $category)->get();
        } else {
            $products = Product::get();
        }
        return $products;
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
        $new_product = new Product();
        $new_product->name = $data['name'];
        $new_product->category = $data['category'];
        $new_product->weight = $data['weight'];
        $new_product->price = $data['price'];
        $new_product->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::with('reviews', 'reviews.user')->find($id);
        return [
            'success' => true,
            'data' => $product
        ];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
