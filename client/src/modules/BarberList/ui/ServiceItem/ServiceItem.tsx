import React from 'react';

interface ServiceItemProps {
    label: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ label }) => (
    <div className="rounded-lg bg-blue-300 border border-blue-300 p-2">
        <li className="text-xx text-center text-gray-900">{label}</li>
    </div>
);

export default ServiceItem;
