const SUPABASE_URL = 'https://YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ฟังก์ชันล็อกอิน
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;

    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) {
        alert('Login failed: ' + error.message);
    } else {
        alert('Login successful');
        window.location.href = 'admin-dashboard.html';
    }
});

// ฟังก์ชันล็อกเอาท์
document.getElementById('logoutBtn').addEventListener('click', async function() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert('Logout failed: ' + error.message);
    } else {
        alert('Logout successful');
        window.location.href = 'admin-login.html';
    }
});

// ฟังก์ชันโหลดข้อมูลผู้ใช้และซ่อมจาก Supabase และแสดงในตาราง
document.addEventListener('DOMContentLoaded', async () => {
    // โหลดข้อมูลผู้ใช้
    const { data: users, error: userError } = await supabase.from('users').select('*');
    if (userError) {
        console.error('Error fetching users: ', userError);
    } else {
        const usersTable = document.getElementById('usersTable');
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser('${user.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">Delete</button>
                </td>
            `;
            usersTable.appendChild(row);
        });
    }

    // โหลดข้อมูลการซ่อม
    const { data: repairs, error: repairError } = await supabase.from('repairs').select('*');
    if (repairError) {
        console.error('Error fetching repairs: ', repairError);
    } else {
        const repairsTable = document.getElementById('repairsTable');
        repairs.forEach(repair => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${repair.date}</td>
                <td>${repair.requester}</td>
                <td>${repair.items}</td>
                <td>${repair.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editRepair('${repair.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteRepair('${repair.id}')">Delete</button>
                </td>
            `;
            repairsTable.appendChild(row);
        });
    }
});

// ฟังก์ชันเพิ่มผู้ใช้ใหม่
document.getElementById('addUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const { data, error } = await supabase.from('users').insert([{ email, password, role }]);
    if (error) {
        console.error('Error adding user: ', error);
        alert('Error adding user');
    } else {
        alert('User added successfully');
        window.location.reload();
    }
});

// ฟังก์ชันลบผู้ใช้
async function deleteUser(userId) {
    const { data, error } = await supabase.from('users').delete().eq('id', userId);
    if (error) {
        console.error('Error deleting user: ', error);
        alert('Error deleting user');
    } else {
        alert('User deleted successfully');
        window.location.reload();
    }
}

// ฟังก์ชันลบงานซ่อม
async function deleteRepair(repairId) {
    const { data, error } = await supabase.from('repairs').delete().eq('id', repairId);
    if (error) {
        console.error('Error deleting repair: ', error);
        alert('Error deleting repair');
    } else {
        alert('Repair deleted successfully');
        window.location.reload();
    }
}

// ฟังก์ชันแก้ไขผู้ใช้ (สามารถเพิ่มการจัดการที่จำเป็นได้)
function editUser(userId) {
    alert(`Edit user with ID: ${userId}`);
    // เพิ่มการจัดการการแก้ไขผู้ใช้ที่นี่
}

// ฟังก์ชันแก้ไขงานซ่อม (สามารถเพิ่มการจัดการที่จำเป็นได้)
function editRepair(repairId) {
    alert(`Edit repair with ID: ${repairId}`);
    // เพิ่มการจัดการการแก้ไขงานซ่อมที่นี่
}
