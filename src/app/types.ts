// Bluetooth device connection status
export type Status = 'disconnected' | 'connected' | 'connecting';

export type Exercise = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    category: string;
    image: string;
    video: string;
}