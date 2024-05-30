const SUPABASE_URL = 'https://YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadRepairStatistics() {
    const { data, error } = await supabase.from('repairs').select('*');
    if (error) {
        console.error('Error loading repair statistics: ', error);
    } else {
        const labels = data.map(repair => repair.date);
        const values = data.map(repair => repair.id);
        renderChart(labels, values);
    }
}

function renderChart(labels, data) {
    const ctx = document.getElementById('repairChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Repair Requests',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function generatePdf() {
    const doc = new jsPDF();
    doc.text("Repair Statistics", 10, 10);
    doc.addImage(document.getElementById('repairChart').toDataURL(), 'JPEG', 10, 20, 180, 160);
    doc.save('repair_statistics.pdf');
}

document.getElementById('generatePdf').addEventListener('click', generatePdf);
document.addEventListener('DOMContentLoaded', loadRepairStatistics);
