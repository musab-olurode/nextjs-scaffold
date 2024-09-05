'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '~/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import ArrowUpIcon from '~/components/icons/arrow-up';

const Accordion = AccordionPrimitive.Root;

const accordionItemVariants = cva('border-b', {
	variants: {
		variant: {
			default: '',
			outline: 'border border-border-light',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface AccordionItemProps
	extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
		VariantProps<typeof accordionItemVariants> {}

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	AccordionItemProps
>(({ className, variant, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn(accordionItemVariants({ variant, className }))}
		{...props}
	/>
));
AccordionItem.displayName = 'AccordionItem';

const accordionTriggerVariants = cva(
	'flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180',
	{
		variants: {
			variant: {
				default: 'hover:underline',
				outline: 'data-[state=open]:border-b border-border-light px-4 sm:px-10',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

interface AccordionTriggerProps
	extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
		VariantProps<typeof accordionTriggerVariants> {}

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	AccordionTriggerProps
>(({ className, variant, children, ...props }, ref) => (
	<AccordionPrimitive.Header className='flex'>
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(accordionTriggerVariants({ variant, className }))}
			{...props}
		>
			{children}
			{variant === 'outline' ? (
				<ArrowUpIcon className='shrink-0 transition-transform duration-200' />
			) : (
				<ChevronDown className='h-4 w-4 shrink-0 transition-transform duration-200' />
			)}
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const accordionContentVariants = cva('pb-4 pt-0', {
	variants: {
		variant: {
			default: '',
			outline: 'px-4 sm:px-10 pt-4',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface AccordionContentProps
	extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
		VariantProps<typeof accordionTriggerVariants> {}

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	AccordionContentProps
>(({ className, variant, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className='overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
		{...props}
	>
		<div className={cn(accordionContentVariants({ className, variant }))}>
			{children}
		</div>
	</AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
