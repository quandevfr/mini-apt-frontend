import InvoiceList from '@/components/InvoiceList';
import RequestList from '@/components/RequestList';
import RoomList from '@/components/RoomList';
import TenantList from '@/components/TenantList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ApartmentDetailsPage = () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="w-full flex-col justify-start gap-6">
          <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 max-w-[1200px] mx-auto">
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Thông tin chi tiết</TabsTrigger>
                <TabsTrigger value="rooms">Danh sách phòng</TabsTrigger>
                <TabsTrigger value="tenants">Người thuê</TabsTrigger>
                <TabsTrigger value="invoices">Hóa đơn thanh toán</TabsTrigger>
                <TabsTrigger value="requests">Yêu cầu / Báo hỏng</TabsTrigger>
              </TabsList>

              <TabsContent value="details">Chi tiết</TabsContent>
              <TabsContent value="rooms">
                <RoomList />
              </TabsContent>
              <TabsContent value="tenants">
                <TenantList />
              </TabsContent>
              <TabsContent value="invoices">
                <InvoiceList />
              </TabsContent>
              <TabsContent value="requests">
                <RequestList />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetailsPage;
