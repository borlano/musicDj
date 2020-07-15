<form id="add-queue" action="{{ route('queue.set') }}" >
    <div class="form-group">
        <label for="link">Ссылка</label>
        <input type="text" name="link" class="form-control">
    </div>
    <button type="submit" class="btn btn-primary">Отправить</button>
    <span class="badge badge-secondary" id="error"></span>
</form>
