/* ========================================== */
/* store.js: Global State Management Engine   */
/* ========================================== */

class StateStore {
    constructor(initialState = {}) {
        this.state = initialState;
        
        // This array holds the callbacks of anyone who wants to know when data changes
        this.listeners = []; 
    }

    // 1. READ STATE
    getState() {
        return this.state;
    }

    // 2. WRITE STATE & BROADCAST
    setState(newStatePayload) {
        // Merge the old state with the new changes
        this.state = { ...this.state, ...newStatePayload };
        
        console.log("🔄 Global State Updated:", this.state);

        // Notify every single subscriber that the data has changed
        this.listeners.forEach((listenerCallback) => {
            listenerCallback(this.state);
        });
    }

    // 3. THE SUBSCRIPTION PIPELINE
    subscribe(listenerCallback) {
        // Add the component's callback to our broadcast list
        this.listeners.push(listenerCallback);

        // Return an unsubscribe function to prevent memory leaks!
        return () => {
            this.listeners = this.listeners.filter(l => l !== listenerCallback);
        };
    }
}

// 4. EXPORT A SINGLETON
// We export ONE instance so the entire app shares the exact same memory bank
export const globalStore = new StateStore({
    cartCount: 0,
    activeUser: null,
    isDarkMode: false
});