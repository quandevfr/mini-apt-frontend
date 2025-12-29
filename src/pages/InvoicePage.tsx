// Components
import { Tabs, TabsContent } from '@/components/ui/tabs';
import InvoiceList from '@/components/InvoiceList';

const InvoicePage = () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
          <TabsContent
            value="outline"
            className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
          >
            <InvoiceList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvoicePage;
