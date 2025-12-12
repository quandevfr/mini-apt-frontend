// Components

import DataTableDefault from '@/components/DataTableDefault';
import { SectionCards } from '@/components/section-cards';
import { Tabs, TabsContent } from '@/components/ui/tabs';

import type { ColumnDef } from '@tanstack/react-table';

interface User {
  id: string;
  name: string;
  email: string;
}
const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];
const dataN: User[] = [{ id: '1', name: 'John', email: 'john@example.com' }];

const DashboardPage = () => {
  const handleRowClick = (user: User) => {
    console.log('Clicked user:', user);
  };

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />

        <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
          <TabsContent
            value="outline"
            className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
          >
            <DataTableDefault
              data={dataN}
              columns={columns}
              getRowId={(user, index) => user.id || `row-${index}`} // Tùy chỉnh ID
              onRowClick={handleRowClick}
              enablePagination={true}
              pageSize={5}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
