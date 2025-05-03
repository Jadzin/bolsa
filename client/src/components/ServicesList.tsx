import { 
  Lock, 
  Users, 
  ArrowLeftRight, 
  CreditCard, 
  PiggyBank 
} from 'lucide-react';

interface Service {
  id: number;
  icon: JSX.Element;
  name: string;
  description: string;
  timestamp: string;
  badgeText?: string;
}

export function ServicesList() {
  const services: Service[] = [
    {
      id: 1,
      icon: <Lock className="h-5 w-5 text-[hsl(var(--caixa-blue))]" />,
      name: 'Liberar acesso',
      description: 'Movimente sua conta',
      timestamp: '12:14'
    },
    {
      id: 2,
      icon: <Users className="h-5 w-5 text-[hsl(var(--caixa-blue))]" />,
      name: 'Atualize seu cadastro',
      description: 'Faça mais com o CAIXA Tem',
      timestamp: '12:14'
    },
    {
      id: 3,
      icon: <ArrowLeftRight className="h-5 w-5 text-[hsl(var(--caixa-blue))]" />,
      name: 'Programa Pé-de-Meia',
      description: 'Gerencie seu benefício',
      timestamp: 'ontem'
    },
    {
      id: 4,
      icon: <div className="bolsa-familia-badge">BOLSA FAMÍLIA</div>,
      name: 'Bolsa Família',
      description: 'Consulte seu benefício',
      timestamp: 'ontem'
    },
    {
      id: 5,
      icon: <CreditCard className="h-5 w-5 text-[hsl(var(--caixa-blue))]" />,
      name: 'Cartão de débito',
      description: 'Serviços para seu cartão físico',
      timestamp: 'ontem'
    },
    {
      id: 6,
      icon: <PiggyBank className="h-5 w-5 text-[hsl(var(--caixa-blue))]" />,
      name: 'Depósito na sua conta CAIXA Tem',
      description: 'Veja e compartilhe como é fácil depositar na lotérica ou caixa eletrônico',
      timestamp: 'ontem'
    },
    {
      id: 7,
      icon: <CreditCard className="h-5 w-5 text-[hsl(var(--caixa-blue))]" />,
      name: 'Cartão de Débito Virtual',
      description: 'Compras em sites e aplicativos',
      timestamp: 'ontem'
    }
  ];

  return (
    <div className="divide-y divide-gray-200">
      {services.map((service) => (
        <div key={service.id} className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-3 flex items-center justify-center">
              {service.icon}
            </div>
            <div>
              <div className="font-medium text-gray-800">{service.name}</div>
              <div className="text-sm text-[hsl(var(--medium-gray))]">{service.description}</div>
            </div>
          </div>
          <div className="text-xs text-[hsl(var(--medium-gray))]">{service.timestamp}</div>
        </div>
      ))}
    </div>
  );
}
