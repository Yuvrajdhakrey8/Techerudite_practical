import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Agent, { IAgent } from "../models/Agent";

export const registerAgent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, email, password, role }: IAgent = req.body;

    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      res.status(400).json({ success: false, message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = new Agent({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newAgent.save();

    res.status(201).json({
      success: true,
      message: "Agent registered successfully",
      agent: { firstName, lastName, email, role },
    });
  } catch (error) {
    console.error("Error in registerAgent:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginAgent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const agent = await Agent.findOne({ email });
    if (!agent) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
      return;
    }

    if (agent.role === "customer") {
      res.status(403).json({
        success: false,
        message: "You are not allowed to login from here",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { id: agent._id, role: agent.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      agent: {
        firstName: agent.firstName,
        lastName: agent.lastName,
        email: agent.email,
        role: agent.role,
      },
    });
  } catch (error) {
    console.error("Error in loginAgent:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
