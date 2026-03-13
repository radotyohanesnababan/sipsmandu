import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, url = '#', title, icon: Icon, ...props }) {
    return (
        <Link
            {...props}
            href={url}
            className={cn(
                active
                    ? 'bg-gradient-to-r from-green-300 via-green-400 to-green-300 font-semibold text-gray-900 hover:text-gray-900'
                    : 'text-muted-foreground hover:text-green-400',
                'flex items-center gap-3 rounded-lg p-2 font-medium transition-all',
            )}
        >
            <Icon className="h-4 w-4" />
            {title}
        </Link>
    );
}
