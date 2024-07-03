<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
    // $file_path = $data['img'] ? Storage::put('/images', $data['img']) : null;
    // $file_path = $data['img'] ? Storage::disk('local')->put('/images', $data['img']) : null;
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'category' => 'required|string|max:50',
            'weight' => 'nullable|integer',
            'price' => 'required|numeric',
            'img' => 'nullable|image',
        ]);

        $data = $request->all();
        $new_product = new Product();
        $new_product->name = $data['name'];
        $new_product->category = $data['category'];
        $new_product->weight = $data['weight'];
        $new_product->price = $data['price'];
        if($request['img']){
            $file_path = Storage::put('/images', $request['img']);
            $new_product->img = '/storage/' . $file_path;
        }
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
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $product = Product::find($id);
        $product->name = $data['name'];
        $product->category = $data['category'];
        if($request['weight']) {
            $product->weight = $data['weight'];
        } else {
            $product->weight = null;
        }
        $product->price = $data['price'];
        if($request['img']){
            $file_path = Storage::put('/images', $request['img']);
            if($file_path) $product->img = '/storage/' . $file_path;
        }
        $product->update();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
