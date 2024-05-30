// supabase.js

import { createClient } from '@supabase/supabase-js';

// การตั้งค่า Supabase client
const supabaseUrl = 'https://pqewgndlmzvflevqumcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZXdnbmRsbXp2ZmxldnF1bWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNTY1MjMsImV4cCI6MjAzMjYzMjUyM30.WbgkiLXAzrUzXykroaMzrmXMyrMAmr8JJ-i5e-TAF4I';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้ทั้งหมด
export async function getUsers() {
  const { data, error } = await supabaseClient
    .from('users')
    .select('*');
  
  if (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
    return [];
  }
  
  return data;
}

// ฟังก์ชันเพื่อเพิ่มผู้ใช้ใหม่
export async function addUser(email, password, role) {
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password
  });
  
  if (error) {
    console.error('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้:', error);
    return null;
  }

  // เพิ่มข้อมูลผู้ใช้อื่นๆ ในตาราง 'profiles' (หรือชื่ออื่นๆ ที่คุณตั้งไว้)
  const { user } = data;
  const { error: profileError } = await supabaseClient
    .from('profiles')
    .insert([{ id: user.id, email: email, role: role }]);

  if (profileError) {
    console.error('เกิดข้อผิดพลาดในการเพิ่มโปรไฟล์ผู้ใช้:', profileError);
    return null;
  }

  return user;
}

// ฟังก์ชันเพื่อดึงข้อมูลการซ่อมทั้งหมด
export async function getRepairs() {
  const { data, error } = await supabaseClient
    .from('repairs')
    .select('*');
  
  if (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลการซ่อม:', error);
    return [];
  }
  
  return data;
}

// ฟังก์ชันเพื่อเพิ่มการซ่อมใหม่
export async function addRepair(requester, equipment, status) {
  const { data, error } = await supabaseClient
    .from('repairs')
    .insert([{ requester: requester, equipment: equipment, status: status }]);
  
  if (error) {
    console.error('เกิดข้อผิดพลาดในการเพิ่มการซ่อม:', error);
    return null;
  }
  
  return data;
}

// ฟังก์ชันเพื่ออัปเดตสถานะการซ่อม
export async function updateRepairStatus(repairId, status) {
  const { data, error } = await supabaseClient
    .from('repairs')
    .update({ status: status })
    .eq('id', repairId);
  
  if (error) {
    console.error('เกิดข้อผิดพลาดในการอัปเดตสถานะการซ่อม:', error);
    return null;
  }
  
  return data;
}
