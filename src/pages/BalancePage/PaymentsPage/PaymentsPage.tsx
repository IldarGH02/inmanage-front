import { CalendarPaymentsBlock } from "../../../entities/Balance/PaymentsBalance/CalendarPaymentsBlock/CalendarPaymentsBlock";
import { PaymentsBlock } from "../../../entities/Balance/PaymentsBalance/PaymentsBlock/PaymentsBlock";

export function PaymentsPage() {

    return (
        <div className="payments__page">
            <div className="payments__page-content">
                <div className="payments__page-calendar">
                    <CalendarPaymentsBlock/>
                </div>
                <div className="payments__page-payments">
                    <PaymentsBlock/>
                </div>
            </div>        
        </div>
    )
}