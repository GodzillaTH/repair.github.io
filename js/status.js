import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pqewgndlmzvflevqumcd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZXdnbmRsbXp2ZmxldnF1bWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNTY1MjMsImV4cCI6MjAzMjYzMjUyM30.WbgkiLXAzrUzXykroaMzrmXMyrMAmr8JJ-i5e-TAF4I'
const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchRepairStatus() {
    const { data, error } = await supabase
        .from('repairs')
        .select('*')

    if (error) {
        console.error('Error fetching repair status:', error)
    } else {
        const tbody = document.getElementById('repairStatusBody')
        tbody.innerHTML = ''
        data.forEach(repair => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${repair.date}</td>
                <td>${repair.repair_id}</td>
                <td>${repair.requester}</td>
                <td>${repair.department}</td>
                <td>${repair.item}</td>
                <td>${repair.receiver}</td>
                <td>${repair.status}</td>
                <td>${repair.details}</td>
            `
            tbody.appendChild(tr)
        })
    }
}

document.addEventListener('DOMContentLoaded', fetchRepairStatus)
