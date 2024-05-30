const SUPABASE_URL = 'https://YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('repairForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = {
        date: formData.get('date'),
        department: formData.get('department'),
        section: formData.get('section'),
        requester: formData.get('requester'),
        building: formData.get('building'),
        floor: formData.get('floor'),
        room: formData.get('room'),
        phone: formData.get('phone'),
        items: formData.get('items'),
        notes: formData.get('notes'),
        status: 'รอดำเนินการ' // สถานะเริ่มต้น
    };

    const { data, error } = await supabase.from('repairs').insert([values]);
    if (error) {
        console.error('Error submitting repair request: ', error);
        alert('Error submitting repair request');
    } else {
        alert('Repair request submitted successfully');
        event.target.reset();
    }
});
