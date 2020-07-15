<?php



Route::get('', 'HomeController@queue');
Route::post('queue', 'HomeController@setMusic')->name('queue.set');
Route::delete('queue/{music_id}', 'HomeController@deleteMusic')->name('queue.delete');
