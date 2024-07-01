<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    //  $reservation->products()->attach(fake()->randomElement($product_ids), ['amount' => rand(1, 100)]);
    //      Auth::user()->courses()->attach($id, ['status' => 'pending']);
    //      return redirect()->back();

    public function index()
    {
        $reservations = Reservation::with('products', 'user')->get();
        return $reservations;
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
        $new_reservation = new Reservation();
        $new_reservation->user_id = Auth::id();
        if (!$new_reservation->user_id) abort(403);
        $new_reservation->date = $data['date'];
        $new_reservation->time = $data['time'];
        $new_reservation->notes = $data['notes'];
        $new_reservation->phone = $data['phone'];
        $new_reservation->save();

        $products = $request->products;
        foreach($products as $product) {
            $new_reservation->products()->attach($product['id'], ['amount' => $product['amount']]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $reservation = Reservation::with('products', 'user')->find($id);
        return $reservation;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find(Auth::id());
        $reservation = Reservation::find($id);
        if($user->id === $reservation->user_id || $user->role === "admin") $reservation->delete();
    }
}
