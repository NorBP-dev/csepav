// Űrlap és fájl kezelése
const form = document.querySelector('.ad-form');
const fileInput = document.querySelector('#image');
const uploadStatus = document.querySelector('#upload-status'); // Hiba vagy siker üzenet

form.addEventListener('submit', async (e) => {
  e.preventDefault();  // Megakadályozza az alapértelmezett űrlapküldést

  // 1. Az űrlap mezőinek értékei
  const title = document.querySelector('#title').value;
  const price = document.querySelector('#price').value;
  const category = document.querySelector('#category').value;
  const shortDescription = document.querySelector('#shortDescription').value;
  const description = document.querySelector('#description').value;
  
  // 2. Ellenőrizni kell, hogy van-e kiválasztott fájl
  if (fileInput.files.length === 0) {
    uploadStatus.textContent = 'Kérjük, válasszon ki egy képet!';
    return;
  }

  // 3. Fájlok feltöltése a Firebase Storage-ba
  const file = fileInput.files[0];
  const fileRef = storage.ref().child(`hirdetesek/${file.name}`);

  try {
    // Fájl feltöltése
    const uploadTask = await fileRef.put(file);

    // Ha sikerült a fájl feltöltése, megszerezzük a letöltési URL-t
    const fileUrl = await uploadTask.ref.getDownloadURL();

    // 4. Adatok mentése a Firestore-ba
    await firestore.collection('hirdetesek').add({
      title: title,
      price: price,
      category: category,
      shortDescription: shortDescription,
      description: description,
      imageUrl: fileUrl,  // Az URL, ahol a kép elérhető
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // A hirdetés időpontja
    });

    // Üzenet a felhasználónak a sikeres feltöltésről
    uploadStatus.textContent = 'Hirdetés sikeresen feltöltve!';
    form.reset();  // Űrlap törlése

  } catch (error) {
    uploadStatus.textContent = 'Hiba történt a feltöltés során: ' + error.message;
  }
});
