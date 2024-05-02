const Token = require("./models/token");


class Publisher {
    constructor() {
        this.subscribers = [];
        setInterval(this.notifyTokenExpired.bind(this), 1000); // Ejecuta cada segundo
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }


    async notifyTokenExpired() {
        const currentDate = DateTime.now().setZone('America/Bogota');
      
        const expiredTokens = await Token.find({
          expirationDate: { $lte: currentDate.toISODate() },
        });
      
        expiredTokens.forEach(async (token) => {
          const tokenExpirationDate = DateTime.fromISO(token.expirationDate); // Convert to DateTime object
      
          console.log('tokenExpirationDate:', tokenExpirationDate);
          console.log('currentDate:', currentDate);
      
          // Compare dates only (ignoring time)
          if (tokenExpirationDate.startOf('day').equals(currentDate.startOf('day'))) {
            console.log('Token expirado fecha es igual a la actual');
            // Or handle expired token here (e.g., notify subscribers)
          }
      
          const [expirationHour, expirationMinute] = token.expirationTime.split(':').map(Number);
      
          if (
            (tokenExpirationDate < currentDate) || // Compare entire dates
            (expirationHour < currentDate.hour) ||
            (expirationHour === currentDate.hour && expirationMinute <= currentDate.minute)
          ) {
            this.subscribers.forEach(callback => callback(token));
          }
        });
      }


      async notifyTokenExpired() {
        const { DateTime } = require('luxon');
        const currentDate = DateTime.now().setZone('America/Bogota');
    
        const expiredTokens = await Token.find({
            expirationDate: { $lte: currentDate.toISODate() },
        });
    
        expiredTokens.forEach(async (token) => {
            const tokenExpirationDate = token.expirationDate.toISOString();
            const datetoken = tokenExpirationDate.substring(0, 10); 

            const [expirationHour, expirationMinute] = token.expirationTime.split(':').map(Number);
            
            if ((datetoken < currentDate.toISODate()) || expirationHour < currentDate.hour || (expirationHour === currentDate.hour && expirationMinute <= currentDate.minute)) {
                this.subscribers.forEach(callback => callback(token));
            }
        });
    }
    
    
}

class Subscriber {
    constructor(publisher) {
        this.publisher = publisher;
    }

    subscribe() {
        this.publisher.subscribe(this.handleExpiredToken.bind(this));
    }

    async handleExpiredToken(token) {
        console.log('Token expirado:', token);
        await Token.findByIdAndDelete(token._id);
    }
}

// Ejemplo de uso
const publisher = new Publisher();
const subscriber = new Subscriber(publisher);
subscriber.subscribe();

