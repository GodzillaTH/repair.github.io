const SUPABASE_URL = 'https://YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadRepairStatus() {
    const { data, error } = await supabase.from('repairs').select('*');
    if (error) {
        console.error('Error loading repair status: ', error);
    } else {
        const tableBody = document.getElementById('repairStatusBody');
        data.forEach(repair => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${repair.date}</td>
                <td>${repair.id}</td>
                <td>${repair.requester}</td>
                <td>${repair.department}</td>
                <td>${repair.items}</td>
                <td>${repair.receiver}</td>
                <td>${repair.status}</td>
                <td><button class="btn btn-info btn-sm" onclick="viewDetails('${repair.id}')">View Details</button></td>
            `;
        });
    }
}

function viewDetails(id) {
    alert(`Details for repair ID: ${id}`);
}

document.addEventListener('DOMContentLoaded', loadRepairStatus);
