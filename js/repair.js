import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqewgndlmzvflevqumcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZXdnbmRsbXp2ZmxldnF1bWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNTY1MjMsImV4cCI6MjAzMjYzMjUyM30.WbgkiLXAzrUzXykroaMzrmXMyrMAmr8JJ-i5e-TAF4I';
const supabase = createClient(supabaseUrl, supabaseKey);

async function addRepair(repairData) {
    const { data, error } = await supabase
        .from('repairs')
        .insert([repairData]);

    if (error) {
        console.error('Error adding repair:', error);
        alert('เกิดข้อผิดพลาดในการแจ้งซ่อม กรุณาลองใหม่อีกครั้ง');
    } else {
        alert('แจ้งซ่อมสำเร็จ');
        window.location.href = 'index.html';
    }
}

document.getElementById('repairForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const repairData = {
        date: document.getElementById('date').value,
        department: document.getElementById('department').value,
        section: document.getElementById('section').value,
        requester: document.getElementById('requester').value,
        building: document.getElementById('building').value,
        floor: document.getElementById('floor').value,
        room: document.getElementById('room').value,
        phone: document.getElementById('phone').value,
        items: document.getElementById('items').value,
        notes: document.getElementById('notes').value,
        status: 'Pending'
    };
    await addRepair(repairData);
});
