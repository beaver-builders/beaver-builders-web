
import 'server-only';
import type { Project, Service } from './types';
import content from './content.json';

const projects = content.projects as Project[];
const services = content.services as Service[];

export const getProjects = async (): Promise<Project[]> => projects;

export const getServices = async (): Promise<Service[]> => services;

export const getProject = async (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getService = async (slug: string) =>
  services.find((service) => service.slug === slug);
