import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ href, className = '' }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center text-blue-600 hover:text-blue-800 transition-colors ${className}`}
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back
    </Link>
  );
}