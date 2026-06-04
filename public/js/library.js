const Library = (() => {
  const DB_NAME = 'voznota';
  const STORE = 'downloads';
  let db = null;

  async function open() {
    if (db) return db;
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = e => {
        e.target.result.createObjectStore(STORE, { keyPath: 'id' });
      };
      req.onsuccess = e => { db = e.target.result; resolve(db); };
      req.onerror = () => reject(req.error);
    });
  }

  async function save(entry) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const tx = d.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(entry);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }

  async function getAll() {
    const d = await open();
    return new Promise((resolve, reject) => {
      const req = d.transaction(STORE, 'readonly').objectStore(STORE).getAll();
      req.onsuccess = () => resolve(req.result.reverse());
      req.onerror = () => reject(req.error);
    });
  }

  async function remove(id) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const tx = d.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(id);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }

  return { save, getAll, remove };
})();
