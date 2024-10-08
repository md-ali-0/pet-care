export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="flex items-center justify-center space-x-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
                <p className="text-primary-500 text-sm font-medium">Loading...</p>
            </div>
        </div>
    );
}
