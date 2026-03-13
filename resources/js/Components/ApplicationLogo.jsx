import { Link } from '@inertiajs/react';
export default function ApplicationLogo({ url = '#', size = 'size-9', isTitle = true }) {
    return (
        <Link href={url} className="flex items-center gap-2">
            <img src="/storage/logo/logo.webp" alt="Logo" className="h-12 w-12" loading="lazy" />
            {isTitle && (
                <div className="flex flex-col">
                    <span className="font-bold leading-none text-foreground">SIMPAS</span>
                    <span className="text-xs font-medium text-muted-foreground">SMA N 2 Siborongborong</span>
                </div>
            )}
        </Link>
    );
}
