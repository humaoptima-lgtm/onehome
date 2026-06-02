// Domain Types — One Home PropTech + ConstructionTech + Escrow + Finance Platform

// Identity Domain
export type { User, UserRole, UserProfile, Permission, Session, Device } from './user';

// Property Domain
export type { Property, PropertyType, PropertyCondition, PropertyStatus, ListingType, Developer, Agent, PropertyFilters, InteriorPackage, FurniturePackage, RenovationEstimate } from './property';

// Vendor Domain
export type { Vendor, VendorCategory, VendorPackage, VendorReview, PortfolioProject, VendorFilters } from './vendor';

// Tender Domain
export type { Tender, TenderScope, TenderFormData, TenderStatus, TenderCategory, BidItem, VendorInvitation } from './tender';
export type { Bid, BidComparison, BidAttachment, BidStatus } from './bid';

// Project Delivery Domain
export type { Project, Milestone, MilestoneStage, MilestoneStatus, DailyReport, ProjectIssue, ProjectPhoto, ProjectStatus, SiteVisit, Inspection, InspectionCheckItem, ChangeOrder } from './project';

// Ledger Domain (Double Entry)
export type { LedgerAccount, LedgerTransaction, JournalEntry, AccountCategory, EntryType, TransactionStatus, ReconciliationLog, ReconciliationDiscrepancy, AccountBalanceSnapshot } from './ledger';

// Project Finance Domain
export type { ProjectWallet, WalletMilestone, WalletStatus, ProjectBudget, MilestonePayment, VendorPayable, RetentionAccount, FundAllocation, Loan, Installment, LoanOption, EligibilityResult, LoanStatus, LoanType } from './project-finance';

// Banking Domain
export type { Bank, BankLoanProduct, LoanApplication, LoanApplicationStatus, LoanDocument, LoanDisbursement, CreditAssessment, CreditAssessmentResult, BankWebhook, DisbursementStatus } from './banking';

// Escrow Domain
export type { EscrowAccount, EscrowAccountStatus, EscrowTransaction, EscrowTransactionType, EscrowDispute, EscrowDisputeStatus, EscrowDisputeResolution, EscrowRelease, Refund } from './escrow';

// AI Domain
export type { AIDesignRequest, AIDesignResult, AICostEstimation, AICostScope, AICostBreakdown, AIRecommendation, AIRecommendationItem, AIUsageLog, AIRequestStatus, AIDesignStyle, AIRoomType } from './ai';

// Outbox & Event System (Rule 8)
export type { OutboxEvent, OutboxStatus, DeadLetterEntry, OutboxMetrics, EventConsumerStatus, DomainEventName, DomainEvent, SchedulerJob } from './outbox';
export type { TenderCreatedPayload, BidSubmittedPayload, VendorSelectedPayload, MilestoneApprovedPayload, LoanDisbursedPayload, EscrowFundedPayload, PaymentReleasedPayload, DisputeOpenedPayload, ProjectCompletedPayload } from './outbox';

// Infrastructure Types
export type { MediaAsset, MediaUploadRequest, MediaUploadResponse, MediaOwnerType } from './media';
export type { Document, DocumentFolder, DocumentVersion, DigitalSignature, DocumentCategory } from './document';
export type { Notification, NotificationType, NotificationChannel, NotificationLog, EmailLog, WhatsAppLog, PushLog } from './notification';
export type { AuditLog, KPI, DashboardMetrics, ConversionFunnel, TimeSeriesData, AnalyticsReport } from './audit';

// Payment Domain
export type { Payment, EscrowTransaction as PaymentEscrowTransaction, Disbursement, PaymentMethod, PaymentStatus, DisbursementStatus as PaymentDisbursementStatus } from './payment';

// Common Types
export type { PaginatedResponse, MediaItem, Coordinates, Address, FilterOption, SortDirection, SortOption } from './common';
