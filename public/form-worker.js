// Web Worker для обработки тяжелых операций формы
self.addEventListener('message', function(e) {
  const { type, data } = e.data;
  
  switch (type) {
    case 'VALIDATE_EMAIL':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(data.email);
      self.postMessage({ type: 'EMAIL_VALIDATED', isValid });
      break;
      
    case 'VALIDATE_PHONE':
      const phoneRegex = /^[\+]?[78][-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
      const phoneValid = phoneRegex.test(data.phone);
      self.postMessage({ type: 'PHONE_VALIDATED', isValid: phoneValid });
      break;
      
    case 'PROCESS_MESSAGE':
      // Эмуляция тяжелой обработки текста
      const processedMessage = data.message
        .trim()
        .replace(/\s+/g, ' ')
        .substring(0, 1000);
      
      self.postMessage({ 
        type: 'MESSAGE_PROCESSED', 
        processedMessage 
      });
      break;
      
    default:
      self.postMessage({ type: 'ERROR', error: 'Unknown operation' });
  }
});