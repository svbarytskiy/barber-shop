import React from 'react';

interface ServiceItemProps {
    label: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ label }) => (
    <div className="rounded-lg bg-gray-600 border border-gray-300 p-2">
        <li className="text-xx text-center text-gray-400">{label}</li>
    </div>
);

export default ServiceItem;
