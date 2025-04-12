// D:\emergency-medical-aid-platform\lib\form-options.ts
// For dropdowns using value/label format
export const indianStates = [
  { value: 'AN', label: 'Andaman and Nicobar Islands' },
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'AR', label: 'Arunachal Pradesh' },
  { value: 'AS', label: 'Assam' },
  { value: 'BR', label: 'Bihar' },
  { value: 'CH', label: 'Chandigarh' },
  { value: 'CT', label: 'Chhattisgarh' },
  { value: 'DN', label: 'Dadra and Nagar Haveli and Daman and Diu' },
  { value: 'DL', label: 'Delhi' },
  { value: 'GA', label: 'Goa' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'HR', label: 'Haryana' },
  { value: 'HP', label: 'Himachal Pradesh' },
  { value: 'JK', label: 'Jammu and Kashmir' },
  { value: 'JH', label: 'Jharkhand' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'KL', label: 'Kerala' },
  { value: 'LD', label: 'Lakshadweep' },
  { value: 'MP', label: 'Madhya Pradesh' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'MN', label: 'Manipur' },
  { value: 'ML', label: 'Meghalaya' },
  { value: 'MZ', label: 'Mizoram' },
  { value: 'NL', label: 'Nagaland' },
  { value: 'OR', label: 'Odisha' },
  { value: 'PY', label: 'Puducherry' },
  { value: 'PB', label: 'Punjab' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'SK', label: 'Sikkim' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'TG', label: 'Telangana' },
  { value: 'TR', label: 'Tripura' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'UT', label: 'Uttarakhand' },
  { value: 'WB', label: 'West Bengal' }
];

// For location selector using id/name format
export const locationStates = [
  {id: 1, name: "Andhra Pradesh"},
  {id: 2, name: "Arunachal Pradesh"},
  {id: 3, name: "Assam"},
  {id: 4, name: "Bihar"},
  {id: 5, name: "Chhattisgarh"},
  {id: 6, name: "Goa"},
  {id: 7, name: "Gujarat"},
  {id: 8, name: "Haryana"},
  {id: 9, name: "Himachal Pradesh"},
  {id: 10, name: "Jharkhand"},
  {id: 11, name: "Karnataka"},
  {id: 12, name: "Kerala"},
  {id: 13, name: "Madhya Pradesh"},
  {id: 14, name: "Maharashtra"},
  {id: 15, name: "Manipur"},
  {id: 16, name: "Meghalaya"},
  {id: 17, name: "Mizoram"},
  {id: 18, name: "Nagaland"},
  {id: 19, name: "Odisha"},
  {id: 20, name: "Punjab"},
  {id: 21, name: "Rajasthan"},
  {id: 22, name: "Sikkim"},
  {id: 23, name: "Tamil Nadu"},
  {id: 24, name: "Telangana"},
  {id: 25, name: "Tripura"},
  {id: 26, name: "Uttar Pradesh"},
  {id: 27, name: "Uttarakhand"},
  {id: 28, name: "West Bengal"},
  {id: 29, name: "Andaman and Nicobar Islands"},
  {id: 30, name: "Chandigarh"},
  {id: 31, name: "Dadra and Nagar Haveli and Daman and Diu"},
  {id: 32, name: "Delhi"},
  {id: 33, name: "Jammu and Kashmir"},
  {id: 34, name: "Ladakh"},
  {id: 35, name: "Lakshadweep"},
  {id: 36, name: "Puducherry"}
];

export const locationDistricts: Record<number, Array<{id: number, name: string}>> = {
  1: [ // Andhra Pradesh
    {id: 1, name: "Anantapur"}, {id: 2, name: "Chittoor"}, {id: 3, name: "East Godavari"},
    {id: 4, name: "Guntur"}, {id: 5, name: "Krishna"}, {id: 6, name: "Kurnool"},
    {id: 7, name: "Nellore"}, {id: 8, name: "Prakasam"}, {id: 9, name: "Srikakulam"},
    {id: 10, name: "Visakhapatnam"}, {id: 11, name: "Vizianagaram"}, {id: 12, name: "West Godavari"},
    {id: 13, name: "YSR Kadapa"}
  ],
  2: [ // Arunachal Pradesh
    {id: 14, name: "Anjaw"}, {id: 15, name: "Changlang"}, {id: 16, name: "Dibang Valley"},
    {id: 17, name: "East Kameng"}, {id: 18, name: "East Siang"}, {id: 19, name: "Kamle"},
    {id: 20, name: "Kra Daadi"}, {id: 21, name: "Kurung Kumey"}, {id: 22, name: "Lepa Rada"},
    {id: 23, name: "Lohit"}, {id: 24, name: "Longding"}, {id: 25, name: "Lower Dibang Valley"},
    {id: 26, name: "Lower Siang"}, {id: 27, name: "Lower Subansiri"}, {id: 28, name: "Namsai"},
    {id: 29, name: "Pakke Kessang"}, {id: 30, name: "Papum Pare"}, {id: 31, name: "Shi Yomi"},
    {id: 32, name: "Siang"}, {id: 33, name: "Tawang"}, {id: 34, name: "Tirap"},
    {id: 35, name: "Upper Siang"}, {id: 36, name: "Upper Subansiri"}, {id: 37, name: "West Kameng"},
    {id: 38, name: "West Siang"}
  ],
  3: [ // Assam
    {id: 39, name: "Baksa"}, {id: 40, name: "Barpeta"}, {id: 41, name: "Biswanath"},
    {id: 42, name: "Bongaigaon"}, {id: 43, name: "Cachar"}, {id: 44, name: "Charaideo"},
    {id: 45, name: "Chirang"}, {id: 46, name: "Darrang"}, {id: 47, name: "Dhemaji"},
    {id: 48, name: "Dhubri"}, {id: 49, name: "Dibrugarh"}, {id: 50, name: "Dima Hasao"},
    {id: 51, name: "Goalpara"}, {id: 52, name: "Golaghat"}, {id: 53, name: "Hailakandi"},
    {id: 54, name: "Hojai"}, {id: 55, name: "Jorhat"}, {id: 56, name: "Kamrup"},
    {id: 57, name: "Kamrup Metropolitan"}, {id: 58, name: "Karbi Anglong"}, {id: 59, name: "Karimganj"},
    {id: 60, name: "Kokrajhar"}, {id: 61, name: "Lakhimpur"}, {id: 62, name: "Majuli"},
    {id: 63, name: "Morigaon"}, {id: 64, name: "Nagaon"}, {id: 65, name: "Nalbari"},
    {id: 66, name: "Sivasagar"}, {id: 67, name: "Sonitpur"}, {id: 68, name: "South Salmara-Mankachar"},
    {id: 69, name: "Tinsukia"}, {id: 70, name: "Udalguri"}, {id: 71, name: "West Karbi Anglong"}
  ],
  4: [ // Bihar
    {id: 72, name: "Araria"}, {id: 73, name: "Arwal"}, {id: 74, name: "Aurangabad"},
    {id: 75, name: "Banka"}, {id: 76, name: "Begusarai"}, {id: 77, name: "Bhagalpur"},
    {id: 78, name: "Bhojpur"}, {id: 79, name: "Buxar"}, {id: 80, name: "Darbhanga"},
    {id: 81, name: "East Champaran"}, {id: 82, name: "Gaya"}, {id: 83, name: "Gopalganj"},
    {id: 84, name: "Jamui"}, {id: 85, name: "Jehanabad"}, {id: 86, name: "Kaimur"},
    {id: 87, name: "Katihar"}, {id: 88, name: "Khagaria"}, {id: 89, name: "Kishanganj"},
    {id: 90, name: "Lakhisarai"}, {id: 91, name: "Madhepura"}, {id: 92, name: "Madhubani"},
    {id: 93, name: "Munger"}, {id: 94, name: "Muzaffarpur"}, {id: 95, name: "Nalanda"},
    {id: 96, name: "Nawada"}, {id: 97, name: "Patna"}, {id: 98, name: "Purnia"},
    {id: 99, name: "Rohtas"}, {id: 100, name: "Saharsa"}, {id: 101, name: "Samastipur"},
    {id: 102, name: "Saran"}, {id: 103, name: "Sheikhpura"}, {id: 104, name: "Sheohar"},
    {id: 105, name: "Sitamarhi"}, {id: 106, name: "Siwan"}, {id: 107, name: "Supaul"},
    {id: 108, name: "Vaishali"}, {id: 109, name: "West Champaran"}
  ],
  5: [ // Chhattisgarh
    {id: 110, name: "Balod"}, {id: 111, name: "Baloda Bazar"}, {id: 112, name: "Balrampur"},
    {id: 113, name: "Bastar"}, {id: 114, name: "Bemetara"}, {id: 115, name: "Bijapur"},
    {id: 116, name: "Bilaspur"}, {id: 117, name: "Dantewada"}, {id: 118, name: "Dhamtari"},
    {id: 119, name: "Durg"}, {id: 120, name: "Gariaband"}, {id: 121, name: "Janjgir-Champa"},
    {id: 122, name: "Jashpur"}, {id: 123, name: "Kabirdham"}, {id: 124, name: "Kanker"},
    {id: 125, name: "Kondagaon"}, {id: 126, name: "Korba"}, {id: 127, name: "Koriya"},
    {id: 128, name: "Mahasamund"}, {id: 129, name: "Mungeli"}, {id: 130, name: "Narayanpur"},
    {id: 131, name: "Raigarh"}, {id: 132, name: "Raipur"}, {id: 133, name: "Rajnandgaon"},
    {id: 134, name: "Sukma"}, {id: 135, name: "Surajpur"}, {id: 136, name: "Surguja"}
  ],
  6: [ // Goa
    {id: 137, name: "North Goa"}, {id: 138, name: "South Goa"}
  ],
  7: [ // Gujarat
    {id: 139, name: "Ahmedabad"}, {id: 140, name: "Amreli"}, {id: 141, name: "Anand"},
    {id: 142, name: "Aravalli"}, {id: 143, name: "Banaskantha"}, {id: 144, name: "Bharuch"},
    {id: 145, name: "Bhavnagar"}, {id: 146, name: "Botad"}, {id: 147, name: "Chhota Udaipur"},
    {id: 148, name: "Dahod"}, {id: 149, name: "Dang"}, {id: 150, name: "Devbhoomi Dwarka"},
    {id: 151, name: "Gandhinagar"}, {id: 152, name: "Gir Somnath"}, {id: 153, name: "Jamnagar"},
    {id: 154, name: "Junagadh"}, {id: 155, name: "Kheda"}, {id: 156, name: "Kutch"},
    {id: 157, name: "Mahisagar"}, {id: 158, name: "Mehsana"}, {id: 159, name: "Morbi"},
    {id: 160, name: "Narmada"}, {id: 161, name: "Navsari"}, {id: 162, name: "Panchmahal"},
    {id: 163, name: "Patan"}, {id: 164, name: "Porbandar"}, {id: 165, name: "Rajkot"},
    {id: 166, name: "Sabarkantha"}, {id: 167, name: "Surat"}, {id: 168, name: "Surendranagar"},
    {id: 169, name: "Tapi"}, {id: 170, name: "Vadodara"}, {id: 171, name: "Valsad"}
  ],
  8: [ // Haryana
    {id: 172, name: "Ambala"}, {id: 173, name: "Bhiwani"}, {id: 174, name: "Charkhi Dadri"},
    {id: 175, name: "Faridabad"}, {id: 176, name: "Fatehabad"}, {id: 177, name: "Gurugram"},
    {id: 178, name: "Hisar"}, {id: 179, name: "Jhajjar"}, {id: 180, name: "Jind"},
    {id: 181, name: "Kaithal"}, {id: 182, name: "Karnal"}, {id: 183, name: "Kurukshetra"},
    {id: 184, name: "Mahendragarh"}, {id: 185, name: "Nuh"}, {id: 186, name: "Palwal"},
    {id: 187, name: "Panchkula"}, {id: 188, name: "Panipat"}, {id: 189, name: "Rewari"},
    {id: 190, name: "Rohtak"}, {id: 191, name: "Sirsa"}, {id: 192, name: "Sonipat"},
    {id: 193, name: "Yamunanagar"}
  ],
  9: [ // Himachal Pradesh
    {id: 194, name: "Bilaspur"}, {id: 195, name: "Chamba"}, {id: 196, name: "Hamirpur"},
    {id: 197, name: "Kangra"}, {id: 198, name: "Kinnaur"}, {id: 199, name: "Kullu"},
    {id: 200, name: "Lahaul and Spiti"}, {id: 201, name: "Mandi"}, {id: 202, name: "Shimla"},
    {id: 203, name: "Sirmaur"}, {id: 204, name: "Solan"}, {id: 205, name: "Una"}
  ],
  10: [ // Jharkhand
    {id: 206, name: "Bokaro"}, {id: 207, name: "Chatra"}, {id: 208, name: "Deoghar"},
    {id: 209, name: "Dhanbad"}, {id: 210, name: "Dumka"}, {id: 211, name: "East Singhbhum"},
    {id: 212, name: "Garhwa"}, {id: 213, name: "Giridih"}, {id: 214, name: "Godda"},
    {id: 215, name: "Gumla"}, {id: 216, name: "Hazaribagh"}, {id: 217, name: "Jamtara"},
    {id: 218, name: "Khunti"}, {id: 219, name: "Koderma"}, {id: 220, name: "Latehar"},
    {id: 221, name: "Lohardaga"}, {id: 222, name: "Pakur"}, {id: 223, name: "Palamu"},
    {id: 224, name: "Ramgarh"}, {id: 225, name: "Ranchi"}, {id: 226, name: "Sahibganj"},
    {id: 227, name: "Seraikela Kharsawan"}, {id: 228, name: "Simdega"}, {id: 229, name: "West Singhbhum"}
  ],
  11: [ // Karnataka
    {id: 230, name: "Bagalkot"}, {id: 231, name: "Ballari"}, {id: 232, name: "Belagavi"},
    {id: 233, name: "Bengaluru Rural"}, {id: 234, name: "Bengaluru Urban"}, {id: 235, name: "Bidar"},
    {id: 236, name: "Chamarajanagar"}, {id: 237, name: "Chikballapur"}, {id: 238, name: "Chikkamagaluru"},
    {id: 239, name: "Chitradurga"}, {id: 240, name: "Dakshina Kannada"}, {id: 241, name: "Davanagere"},
    {id: 242, name: "Dharwad"}, {id: 243, name: "Gadag"}, {id: 244, name: "Hassan"},
    {id: 245, name: "Haveri"}, {id: 246, name: "Kalaburagi"}, {id: 247, name: "Kodagu"},
    {id: 248, name: "Kolar"}, {id: 249, name: "Koppal"}, {id: 250, name: "Mandya"},
    {id: 251, name: "Mysuru"}, {id: 252, name: "Raichur"}, {id: 253, name: "Ramanagara"},
    {id: 254, name: "Shivamogga"}, {id: 255, name: "Tumakuru"}, {id: 256, name: "Udupi"},
    {id: 257, name: "Uttara Kannada"}, {id: 258, name: "Vijayapura"}, {id: 259, name: "Yadgir"}
  ],
  12: [ // Kerala
    {id: 260, name: "Alappuzha"}, {id: 261, name: "Ernakulam"}, {id: 262, name: "Idukki"},
    {id: 263, name: "Kannur"}, {id: 264, name: "Kasaragod"}, {id: 265, name: "Kollam"},
    {id: 266, name: "Kottayam"}, {id: 267, name: "Kozhikode"}, {id: 268, name: "Malappuram"},
    {id: 269, name: "Palakkad"}, {id: 270, name: "Pathanamthitta"}, {id: 271, name: "Thiruvananthapuram"},
    {id: 272, name: "Thrissur"}, {id: 273, name: "Wayanad"}
  ],
  13: [ // Madhya Pradesh
    {id: 274, name: "Agar Malwa"}, {id: 275, name: "Alirajpur"}, {id: 276, name: "Anuppur"},
    {id: 277, name: "Ashoknagar"}, {id: 278, name: "Balaghat"}, {id: 279, name: "Barwani"},
    {id: 280, name: "Betul"}, {id: 281, name: "Bhind"}, {id: 282, name: "Bhopal"},
    {id: 283, name: "Burhanpur"}, {id: 284, name: "Chhatarpur"}, {id: 285, name: "Chhindwara"},
    {id: 286, name: "Damoh"}, {id: 287, name: "Datia"}, {id: 288, name: "Dewas"},
    {id: 289, name: "Dhar"}, {id: 290, name: "Dindori"}, {id: 291, name: "Guna"},
    {id: 292, name: "Gwalior"}, {id: 293, name: "Harda"}, {id: 294, name: "Hoshangabad"},
    {id: 295, name: "Indore"}, {id: 296, name: "Jabalpur"}, {id: 297, name: "Jhabua"},
    {id: 298, name: "Katni"}, {id: 299, name: "Khandwa"}, {id: 300, name: "Khargone"},
    {id: 301, name: "Mandla"}, {id: 302, name: "Mandsaur"}, {id: 303, name: "Morena"},
    {id: 304, name: "Narsinghpur"}, {id: 305, name: "Neemuch"}, {id: 306, name: "Panna"},
    {id: 307, name: "Raisen"}, {id: 308, name: "Rajgarh"}, {id: 309, name: "Ratlam"},
    {id: 310, name: "Rewa"}, {id: 311, name: "Sagar"}, {id: 312, name: "Satna"},
    {id: 313, name: "Sehore"}, {id: 314, name: "Seoni"}, {id: 315, name: "Shahdol"},
    {id: 316, name: "Shajapur"}, {id: 317, name: "Sheopur"}, {id: 318, name: "Shivpuri"},
    {id: 319, name: "Sidhi"}, {id: 320, name: "Singrauli"}, {id: 321, name: "Tikamgarh"},
    {id: 322, name: "Ujjain"}, {id: 323, name: "Umaria"}, {id: 324, name: "Vidisha"}
  ],
  14: [ // Maharashtra
    {id: 325, name: "Ahmednagar"}, {id: 326, name: "Akola"}, {id: 327, name: "Amravati"},
    {id: 328, name: "Aurangabad"}, {id: 329, name: "Beed"}, {id: 330, name: "Bhandara"},
    {id: 331, name: "Buldhana"}, {id: 332, name: "Chandrapur"}, {id: 333, name: "Dhule"},
    {id: 334, name: "Gadchiroli"}, {id: 335, name: "Gondia"}, {id: 336, name: "Hingoli"},
    {id: 337, name: "Jalgaon"}, {id: 338, name: "Jalna"}, {id: 339, name: "Kolhapur"},
    {id: 340, name: "Latur"}, {id: 341, name: "Mumbai City"}, {id: 342, name: "Mumbai Suburban"},
    {id: 343, name: "Nagpur"}, {id: 344, name: "Nanded"}, {id: 345, name: "Nandurbar"},
    {id: 346, name: "Nashik"}, {id: 347, name: "Osmanabad"}, {id: 348, name: "Palghar"},
    {id: 349, name: "Parbhani"}, {id: 350, name: "Pune"}, {id: 351, name: "Raigad"},
    {id: 352, name: "Ratnagiri"}, {id: 353, name: "Sangli"}, {id: 354, name: "Satara"},
    {id: 355, name: "Sindhudurg"}, {id: 356, name: "Solapur"}, {id: 357, name: "Thane"},
    {id: 358, name: "Wardha"}, {id: 359, name: "Washim"}, {id: 360, name: "Yavatmal"}
  ],
  15: [ // Manipur
    {id: 361, name: "Bishnupur"}, {id: 362, name: "Chandel"}, {id: 363, name: "Churachandpur"},
    {id: 364, name: "Imphal East"}, {id: 365, name: "Imphal West"}, {id: 366, name: "Jiribam"},
    {id: 367, name: "Kakching"}, {id: 368, name: "Kamjong"}, {id: 369, name: "Kangpokpi"},
    {id: 370, name: "Noney"}, {id: 371, name: "Pherzawl"}, {id: 372, name: "Senapati"},
    {id: 373, name: "Tamenglong"}, {id: 374, name: "Tengnoupal"}, {id: 375, name: "Thoubal"},
    {id: 376, name: "Ukhrul"}
  ],
  16: [ // Meghalaya
    {id: 377, name: "East Garo Hills"}, {id: 378, name: "East Jaintia Hills"}, {id: 379, name: "East Khasi Hills"},
    {id: 380, name: "North Garo Hills"}, {id: 381, name: "Ri Bhoi"}, {id: 382, name: "South Garo Hills"},
    {id: 383, name: "South West Garo Hills"}, {id: 384, name: "South West Khasi Hills"}, {id: 385, name: "West Garo Hills"},
    {id: 386, name: "West Jaintia Hills"}, {id: 387, name: "West Khasi Hills"}
  ],
  17: [ // Mizoram
    {id: 388, name: "Aizawl"}, {id: 389, name: "Champhai"}, {id: 390, name: "Hnahthial"},
    {id: 391, name: "Khawzawl"}, {id: 392, name: "Kolasib"}, {id: 393, name: "Lawngtlai"},
    {id: 394, name: "Lunglei"}, {id: 395, name: "Mamit"}, {id: 396, name: "Saiha"},
    {id: 397, name: "Saitual"}, {id: 398, name: "Serchhip"}
  ],
  18: [ // Nagaland
    {id: 399, name: "Dimapur"}, {id: 400, name: "Kiphire"}, {id: 401, name: "Kohima"},
    {id: 402, name: "Longleng"}, {id: 403, name: "Mokokchung"}, {id: 404, name: "Mon"},
    {id: 405, name: "Peren"}, {id: 406, name: "Phek"}, {id: 407, name: "Tuensang"},
    {id: 408, name: "Wokha"}, {id: 409, name: "Zunheboto"}
  ],
  19: [ // Odisha
    {id: 410, name: "Angul"}, {id: 411, name: "Balangir"}, {id: 412, name: "Balasore"},
    {id: 413, name: "Bargarh"}, {id: 414, name: "Bhadrak"}, {id: 415, name: "Boudh"},
    {id: 416, name: "Cuttack"}, {id: 417, name: "Deogarh"}, {id: 418, name: "Dhenkanal"},
    {id: 419, name: "Gajapati"}, {id: 420, name: "Ganjam"}, {id: 421, name: "Jagatsinghpur"},
    {id: 422, name: "Jajpur"}, {id: 423, name: "Jharsuguda"}, {id: 424, name: "Kalahandi"},
    {id: 425, name: "Kandhamal"}, {id: 426, name: "Kendrapara"}, {id: 427, name: "Kendujhar"},
    {id: 428, name: "Khordha"}, {id: 429, name: "Koraput"}, {id: 430, name: "Malkangiri"},
    {id: 431, name: "Mayurbhanj"}, {id: 432, name: "Nabarangpur"}, {id: 433, name: "Nayagarh"},
    {id: 434, name: "Nuapada"}, {id: 435, name: "Puri"}, {id: 436, name: "Rayagada"},
    {id: 437, name: "Sambalpur"}, {id: 438, name: "Subarnapur"}, {id: 439, name: "Sundargarh"}
  ],
  20: [ // Punjab
    {id: 440, name: "Amritsar"}, {id: 441, name: "Barnala"}, {id: 442, name: "Bathinda"},
    {id: 443, name: "Faridkot"}, {id: 444, name: "Fatehgarh Sahib"}, {id: 445, name: "Fazilka"},
    {id: 446, name: "Ferozepur"}, {id: 447, name: "Gurdaspur"}, {id: 448, name: "Hoshiarpur"},
    {id: 449, name: "Jalandhar"}, {id: 450, name: "Kapurthala"}, {id: 451, name: "Ludhiana"},
    {id: 452, name: "Mansa"}, {id: 453, name: "Moga"}, {id: 454, name: "Muktsar"},
    {id: 455, name: "Pathankot"}, {id: 456, name: "Patiala"}, {id: 457, name: "Rupnagar"},
    {id: 458, name: "Sahibzada Ajit Singh Nagar"}, {id: 459, name: "Sangrur"}, {id: 460, name: "Shahid Bhagat Singh Nagar"},
    {id: 461, name: "Tarn Taran"}
  ],
  21: [ // Rajasthan
    {id: 462, name: "Ajmer"}, {id: 463, name: "Alwar"}, {id: 464, name: "Banswara"},
    {id: 465, name: "Baran"}, {id: 466, name: "Barmer"}, {id: 467, name: "Bharatpur"},
    {id: 468, name: "Bhilwara"}, {id: 469, name: "Bikaner"}, {id: 470, name: "Bundi"},
    {id: 471, name: "Chittorgarh"}, {id: 472, name: "Churu"}, {id: 473, name: "Dausa"},
    {id: 474, name: "Dholpur"}, {id: 475, name: "Dungarpur"}, {id: 476, name: "Hanumangarh"},
    {id: 477, name: "Jaipur"}, {id: 478, name: "Jaisalmer"}, {id: 479, name: "Jalore"},
    {id: 480, name: "Jhalawar"}, {id: 481, name: "Jhunjhunu"}, {id: 482, name: "Jodhpur"},
    {id: 483, name: "Karauli"}, {id: 484, name: "Kota"}, {id: 485, name: "Nagaur"},
    {id: 486, name: "Pali"}, {id: 487, name: "Pratapgarh"}, {id: 488, name: "Rajsamand"},
    {id: 489, name: "Sawai Madhopur"}, {id: 490, name: "Sikar"}, {id: 491, name: "Sirohi"},
    {id: 492, name: "Sri Ganganagar"}, {id: 493, name: "Tonk"}, {id: 494, name: "Udaipur"}
  ],
  22: [ // Sikkim
    {id: 495, name: "East Sikkim"}, {id: 496, name: "North Sikkim"}, {id: 497, name: "South Sikkim"},
    {id: 498, name: "West Sikkim"}
  ],
  23: [ // Tamil Nadu
    {id: 499, name: "Ariyalur"}, {id: 500, name: "Chengalpattu"}, {id: 501, name: "Chennai"},
    {id: 502, name: "Coimbatore"}, {id: 503, name: "Cuddalore"}, {id: 504, name: "Dharmapuri"},
    {id: 505, name: "Dindigul"}, {id: 506, name: "Erode"}, {id: 507, name: "Kallakurichi"},
    {id: 508, name: "Karur"}, {id: 509, name: "Krishnagiri"}, {id: 510, name: "Madurai"},
    {id: 511, name: "Mayiladuthurai"}, {id: 512, name: "Nagapattinam"}, {id: 513, name: "Namakkal"},
    {id: 514, name: "Nilgiris"}, {id: 515, name: "Perambalur"}, {id: 516, name: "Pudukkottai"},
    {id: 517, name: "Ramanathapuram"}, {id: 518, name: "Ranipet"}, {id: 519, name: "Salem"},
    {id: 520, name: "Sivaganga"}, {id: 521, name: "Tenkasi"}, {id: 522, name: "Thanjavur"},
    {id: 523, name: "Theni"}, {id: 524, name: "Thoothukudi"}, {id: 525, name: "Tiruchirappalli"},
    {id: 526, name: "Tirunelveli"}, {id: 527, name: "Tirupathur"}, {id: 528, name: "Tiruppur"},
    {id: 529, name: "Tiruvallur"}, {id: 530, name: "Tiruvannamalai"}, {id: 531, name: "Tiruvarur"},
    {id: 532, name: "Vellore"}, {id: 533, name: "Viluppuram"}, {id: 534, name: "Virudhunagar"}
  ],
  24: [ // Telangana
    {id: 535, name: "Adilabad"}, {id: 536, name: "Bhadradri Kothagudem"}, {id: 537, name: "Hyderabad"},
    {id: 538, name: "Jagtial"}, {id: 539, name: "Jangaon"}, {id: 540, name: "Jayashankar Bhupalpally"},
    {id: 541, name: "Jogulamba Gadwal"}, {id: 542, name: "Kamareddy"}, {id: 543, name: "Karimnagar"},
    {id: 544, name: "Khammam"}, {id: 545, name: "Komaram Bheem Asifabad"}, {id: 546, name: "Mahabubabad"},
    {id: 547, name: "Mahabubnagar"}, {id: 548, name: "Mancherial"}, {id: 549, name: "Medak"},
    {id: 550, name: "Medchal-Malkajgiri"}, {id: 551, name: "Mulugu"}, {id: 552, name: "Nagarkurnool"},
    {id: 553, name: "Nalgonda"}, {id: 554, name: "Narayanpet"}, {id: 555, name: "Nirmal"},
    {id: 556, name: "Nizamabad"}, {id: 557, name: "Peddapalli"}, {id: 558, name: "Rajanna Sircilla"},
    {id: 559, name: "Rangareddy"}, {id: 560, name: "Sangareddy"}, {id: 561, name: "Siddipet"},
    {id: 562, name: "Suryapet"}, {id: 563, name: "Vikarabad"}, {id: 564, name: "Wanaparthy"},
    {id: 565, name: "Warangal Rural"}, {id: 566, name: "Warangal Urban"}, {id: 567, name: "Yadadri Bhuvanagiri"}
  ],
  25: [ // Tripura
    {id: 568, name: "Dhalai"}, {id: 569, name: "Gomati"}, {id: 570, name: "Khowai"},
    {id: 571, name: "North Tripura"}, {id: 572, name: "Sepahijala"}, {id: 573, name: "South Tripura"},
    {id: 574, name: "Unakoti"}, {id: 575, name: "West Tripura"}
  ],
  26: [ // Uttar Pradesh
    {id: 576, name: "Agra"}, {id: 577, name: "Aligarh"}, {id: 578, name: "Ambedkar Nagar"},
    {id: 579, name: "Amethi"}, {id: 580, name: "Amroha"}, {id: 581, name: "Auraiya"},
    {id: 582, name: "Ayodhya"}, {id: 583, name: "Azamgarh"}, {id: 584, name: "Baghpat"},
    {id: 585, name: "Bahraich"}, {id: 586, name: "Ballia"}, {id: 587, name: "Balrampur"},
    {id: 588, name: "Banda"}, {id: 589, name: "Barabanki"}, {id: 590, name: "Bareilly"},
    {id: 591, name: "Basti"}, {id: 592, name: "Bhadohi"}, {id: 593, name: "Bijnor"},
    {id: 594, name: "Budaun"}, {id: 595, name: "Bulandshahr"}, {id: 596, name: "Chandauli"},
    {id: 597, name: "Chitrakoot"}, {id: 598, name: "Deoria"}, {id: 599, name: "Etah"},
    {id: 600, name: "Etawah"}, {id: 601, name: "Farrukhabad"}, {id: 602, name: "Fatehpur"},
    {id: 603, name: "Firozabad"}, {id: 604, name: "Gautam Buddha Nagar"}, {id: 605, name: "Ghaziabad"},
    {id: 606, name: "Ghazipur"}, {id: 607, name: "Gonda"}, {id: 608, name: "Gorakhpur"},
    {id: 609, name: "Hamirpur"}, {id: 610, name: "Hapur"}, {id: 611, name: "Hardoi"},
    {id: 612, name: "Hathras"}, {id: 613, name: "Jalaun"}, {id: 614, name: "Jaunpur"},
    {id: 615, name: "Jhansi"}, {id: 616, name: "Kannauj"}, {id: 617, name: "Kanpur Dehat"},
    {id: 618, name: "Kanpur Nagar"}, {id: 619, name: "Kasganj"}, {id: 620, name: "Kaushambi"},
    {id: 621, name: "Kheri"}, {id: 622, name: "Kushinagar"}, {id: 623, name: "Lalitpur"},
    {id: 624, name: "Lucknow"}, {id: 625, name: "Maharajganj"}, {id: 626, name: "Mahoba"},
    {id: 627, name: "Mainpuri"}, {id: 628, name: "Mathura"}, {id: 629, name: "Mau"},
    {id: 630, name: "Meerut"}, {id: 631, name: "Mirzapur"}, {id: 632, name: "Moradabad"},
    {id: 633, name: "Muzaffarnagar"}, {id: 634, name: "Pilibhit"}, {id: 635, name: "Pratapgarh"},
    {id: 636, name: "Prayagraj"}, {id: 637, name: "Raebareli"}, {id: 638, name: "Rampur"},
    {id: 639, name: "Saharanpur"}, {id: 640, name: "Sambhal"}, {id: 641, name: "Sant Kabir Nagar"},
    {id: 642, name: "Shahjahanpur"}, {id: 643, name: "Shamli"}, {id: 644, name: "Shravasti"},
    {id: 645, name: "Siddharthnagar"}, {id: 646, name: "Sitapur"}, {id: 647, name: "Sonbhadra"},
    {id: 648, name: "Sultanpur"}, {id: 649, name: "Unnao"}, {id: 650, name: "Varanasi"}
  ],
  27: [ // Uttarakhand
    {id: 651, name: "Almora"}, {id: 652, name: "Bageshwar"}, {id: 653, name: "Chamoli"},
    {id: 654, name: "Champawat"}, {id: 655, name: "Dehradun"}, {id: 656, name: "Haridwar"},
    {id: 657, name: "Nainital"}, {id: 658, name: "Pauri Garhwal"}, {id: 659, name: "Pithoragarh"},
    {id: 660, name: "Rudraprayag"}, {id: 661, name: "Tehri Garhwal"}, {id: 662, name: "Udham Singh Nagar"},
    {id: 663, name: "Uttarkashi"}
  ],
  28: [ // West Bengal
    {id: 664, name: "Alipurduar"}, {id: 665, name: "Bankura"}, {id: 666, name: "Birbhum"},
    {id: 667, name: "Cooch Behar"}, {id: 668, name: "Dakshin Dinajpur"}, {id: 669, name: "Darjeeling"},
    {id: 670, name: "Hooghly"}, {id: 671, name: "Howrah"}, {id: 672, name: "Jalpaiguri"},
    {id: 673, name: "Jhargram"}, {id: 674, name: "Kalimpong"}, {id: 675, name: "Kolkata"},
    {id: 676, name: "Malda"}, {id: 677, name: "Murshidabad"}, {id: 678, name: "Nadia"},
    {id: 679, name: "North 24 Parganas"}, {id: 680, name: "Paschim Bardhaman"}, {id: 681, name: "Paschim Medinipur"},
    {id: 682, name: "Purba Bardhaman"}, {id: 683, name: "Purba Medinipur"}, {id: 684, name: "Purulia"},
    {id: 685, name: "South 24 Parganas"}, {id: 686, name: "Uttar Dinajpur"}
  ],
  29: [ // Andaman and Nicobar Islands
    {id: 687, name: "Nicobar"}, {id: 688, name: "North and Middle Andaman"}, {id: 689, name: "South Andaman"}
  ],
  30: [ // Chandigarh
    {id: 690, name: "Chandigarh"}
  ],
  31: [ // Dadra and Nagar Haveli and Daman and Diu
    {id: 691, name: "Dadra and Nagar Haveli"}, {id: 692, name: "Daman"}, {id: 693, name: "Diu"}
  ],
  32: [ // Delhi
    {id: 694, name: "Central Delhi"}, {id: 695, name: "East Delhi"}, {id: 696, name: "New Delhi"},
    {id: 697, name: "North Delhi"}, {id: 698, name: "North East Delhi"}, {id: 699, name: "North West Delhi"},
    {id: 700, name: "Shahdara"}, {id: 701, name: "South Delhi"}, {id: 702, name: "South East Delhi"},
    {id: 703, name: "South West Delhi"}, {id: 704, name: "West Delhi"}
  ],
  33: [ // Jammu and Kashmir
    {id: 705, name: "Anantnag"}, {id: 706, name: "Bandipora"}, {id: 707, name: "Baramulla"},
    {id: 708, name: "Budgam"}, {id: 709, name: "Doda"}, {id: 710, name: "Ganderbal"},
    {id: 711, name: "Jammu"}, {id: 712, name: "Kathua"}, {id: 713, name: "Kishtwar"},
    {id: 714, name: "Kulgam"}, {id: 715, name: "Kupwara"}, {id: 716, name: "Poonch"},
    {id: 717, name: "Pulwama"}, {id: 718, name: "Rajouri"}, {id: 719, name: "Ramban"},
    {id: 720, name: "Reasi"}, {id: 721, name: "Samba"}, {id: 722, name: "Shopian"},
    {id: 723, name: "Srinagar"}, {id: 724, name: "Udhampur"}
  ],
  34: [ // Ladakh
    {id: 725, name: "Kargil"}, {id: 726, name: "Leh"}
  ],
  35: [ // Lakshadweep
    {id: 727, name: "Lakshadweep"}
  ],
  36: [ // Puducherry
    {id: 728, name: "Karaikal"}, {id: 729, name: "Mahe"}, {id: 730, name: "Puducherry"},
    {id: 731, name: "Yanam"}
  ]
};

export const bloodTypes = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' }
];

export const emergencyTypes = [
  { value: 'medical', label: 'Medical Emergency' },
  { value: 'accident', label: 'Traffic Accident' },
  { value: 'natural', label: 'Natural Disaster' }
];

