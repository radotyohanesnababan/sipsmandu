import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function NavLinkResponsive({ active = false, url = '#', title, icon: Icon, ...props }) {
    return (
        <Link
            {...props}
            href={url}
            className={cn(
                active
                    ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-500 font-semibold text-white hover:text-white'
                    : 'text-muted-foreground hover:text-green-500',
                'flex items-center gap-3 rounded-lg p-2 font-medium transition-all',
            )}
        >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{title}</span>
        </Link>
    );
}
