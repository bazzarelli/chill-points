// Bluetooth device connection status
export type Status = 'disconnected' | 'connected' | 'connecting';

export type Exercise = {
    exerciseId: string;
    title: string;
    subtitle: string;
    description: string;
    category: string;
    image: string;
    video: string;
}