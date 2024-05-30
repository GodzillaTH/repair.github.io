import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pqewgndlmzvflevqumcd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZXdnbmRsbXp2ZmxldnF1bWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNTY1MjMsImV4cCI6MjAzMjYzMjUyM30.WbgkiLXAzrUzXykroaMzrmXMyrMAmr8JJ-i5e-TAF4I'
const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchRepairStatistics() {
    const { data, error } = await supabase
        .from('repairs')
        .select('*')

    if (error) {
        console.error('Error fetching repair statistics:', error)
    } else {
        const ctx = document.getElementById('repairChart').getContext('2d')
        const chartData = {
            labels: data.map(repair => repair.date),
            datasets: [{
                label: 'Repairs',
                data: data.map(repair => repair.status),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }

        new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', fetchRepairStatistics)

document.getElementById('generatePdf').addEventListener('click', () => {
    const doc = new jsPDF()
    doc.text('Repair Statistics', 10, 10)
    doc.addImage(document.getElementById('repairChart'), 'PNG', 10, 20, 180, 160)
    doc.save('repair_statistics.pdf')
})
